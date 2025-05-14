import { useState } from "react";
import { message, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { UploadChangeParam } from "antd/es/upload";
import { cn } from "@/utils";
import { Icon } from "../ui/Icon";
import { CreateSpaceModal } from "@/containers";
import { useDocListStore, useDocLib } from "@/store";
import "./index.css";

interface AddOrUploadProps {
  type: "addFile" | "upload" | "addSpace";
  className?: string;
}
function AddOrUpload({ type, className }: AddOrUploadProps) {
  const navigate = useNavigate();
  const { docLibId, setDocLibId } = useDocLib();
  const { createRootDoc, fetchDocList } = useDocListStore();
  const [open, setOpen] = useState(false);

  const handleUploadChange = (info: UploadChangeParam) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} 上传成功`);
      fetchDocList(setDocLibId);
      navigate(info.file.response.data.url);
    } else if (info.file.status === "error") {
      message.error(
        `${info.file.name} 上传失败: ${info.file.response?.message}`
      );
    }
  };

  if (type === "addFile") {
    return (
      <div
        className={cn("add-or-upload", className)}
        onClick={() => {
          createRootDoc(docLibId);
        }}
      >
        <div className="w-6 h-6 mr-3">
          <Icon name="FilePlus" className="w-6 h-6 text-addFile" />
        </div>

        <div style={{ flex: 1 }}>
          <p>新建</p>
          <p className="text-xs text-gray-500">新建文档开始协作</p>
        </div>
      </div>
    );
  } else if (type === "upload") {
    return (
      <Upload
        showUploadList={false}
        name="markdown"
        action="http://localhost:5001/api/upload/markdown"
        onChange={handleUploadChange}
        headers={{
          Authorization: `Bearer ${localStorage.getItem("token")!}`,
        }}
      >
        <div className="add-or-upload">
          <div className="w-6 h-6 mr-3">
            <Icon name="CloudUpload" className="w-6 h-6 text-clouldUpload" />
          </div>
          <div style={{ flex: 1 }}>
            <p>上传</p>
            <p className="text-xs text-gray-500">上传本地文件</p>
          </div>
        </div>
      </Upload>
    );
  } else {
    return (
      <>
        <div
          className={cn("add-or-upload", className)}
          onClick={() => setOpen(true)}
        >
          <div className="w-6 h-6 mr-3">
            <Icon name="LibraryBig" className="w-6 h-6 text-addFile" />
          </div>

          <div style={{ flex: 1 }}>
            <p>新建空间</p>
            <p className="text-xs text-gray-500">让知识创造价值</p>
          </div>
        </div>
        <CreateSpaceModal open={open} setOpen={setOpen} />
      </>
    );
  }
}

export default AddOrUpload;
