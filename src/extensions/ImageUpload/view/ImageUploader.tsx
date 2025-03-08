import { Upload } from "antd";
import { Icon } from "@/components/ui/Icon";
import type { UploadProps } from "antd";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  accept: ".png,.jpg,.jpeg,.gif,.bmp,.webp",
  multiple: false,
};
export default function ImageUploader() {
  // 得有loading效果
  return (
    <Dragger {...props} className="flex justify-center items-center">
      <div className="flex justify-center items-center">
        <p className="">
          <Icon name="Image" className="w-12 h-12 mb-4 text-black"/>
        </p>
      </div>
    </Dragger>
  );
}
