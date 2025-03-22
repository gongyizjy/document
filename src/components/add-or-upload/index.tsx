import { Upload } from "antd";
import { cn } from "@/utils";
import { Icon } from "../ui/Icon";
import "./index.css";

interface AddOrUploadProps {
  type: "add" | "upload";
  className?: string;
}
function AddOrUpload({ type, className }: AddOrUploadProps) {
  return (
    <>
      {type === "add" ? (
        <div className={cn("add-or-upload", className)}>
          <div className="w-6 h-6 mr-3">
            <Icon name="FilePlus" className="w-6 h-6 text-addFile" />
          </div>

          <div style={{ flex: 1 }}>
            <p>新建</p>
            <p className="text-xs text-gray-500">新建文档开始协作</p>
          </div>
        </div>
      ) : (
        <Upload
          showUploadList={false}
          name="markdown"
          action="http://localhost:5001/api/upload/markdown"
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
      )}
    </>
  );
}

export default AddOrUpload;
