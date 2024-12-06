import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
export default function MenuSearch() {
  return (
    <div className="box-content w-[249px] h-[38px] ml-[8px] mr-[8px]">
      <div className="mb-[6px] mr-[2px] w-full h-[32px]">
        <Input
          placeholder="搜索"
          prefix={
            <SearchOutlined style={{ fontSize: "16px", color: "#d2d8dc" }} />
          }
        />
      </div>
    </div>
  );
}
