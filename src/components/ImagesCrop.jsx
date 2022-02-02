import React, { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import { Upload, Image, Button } from "antd";
import "antd/dist/antd.css";
import axios from "axios";

const App = () => {
  const [fileList, setFileList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [src, setSrc] = useState("");

  useEffect(() => {
    axios.get("/upload/images").then((res) => {
      const uid = res.data.map((item) => item.uid);
      const name = res.data.map((item) => item.name);
      const status = res.data.map((item) => item.status);
      const url = res.data.map((item) => item.url);
      let fileList = [];
      for (let i = 0; i < uid.length; i++) {
        fileList.push({
          uid: i + 1,
          name: name[i],
          status: status[i],
          url: url[i],
        });
      }
      setFileList(fileList);
    });
  }, []);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    window.location.reload();
  };

  const onPreview = async (file) => {
    const src = file.url || file.thumbUrl;
    setSrc(src);
    setVisible(true);
  };

  let x = 0;
  fileList.map((item) => {
    x++;
  });

  return (
    <div>
      <ImgCrop grid rotate>
        <Upload
          action="/upload"
          accept={"image/*"}
          method="post"
          name="file"
          onRemove={(file) => {
            const delete_url = "/upload/delete/" + file.name;
            axios.delete(delete_url).then((res) => {
              console.log(res);
            });
          }}
          enctype="multipart/form-data"
          listType="picture-card"
          onuploading={(file) => {
            console.log(file);
          }}
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < x + 1 && "+ Upload"}
        </Upload>
      </ImgCrop>
      <Image
        preview={{
          visible,
          src: src,
          onVisibleChange: (images) => {
            setVisible(images);
          },
        }}
      />
    </div>
  );
};

export default App;
