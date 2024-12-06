import MenuItem, { MenuItemProps } from "./components/MenuItem";
import { HomeOutlined, ReadOutlined } from "@ant-design/icons";
const menuItem: MenuItemProps[] = [
  {
    id: 1,
    name: "主页",
    icon: HomeOutlined
  },
  {
    id: 2,
    name: "知识库",
    icon:ReadOutlined
  }
]
export default function Menu() {
  const menuItemList = menuItem.map(item => (<MenuItem key={item.id} {...item} />))
  return (
    <div className="box-content w-[257px] flex flex-col pl-[8px] pb-[4px]">
      {menuItemList}
    </div>
  )
}
