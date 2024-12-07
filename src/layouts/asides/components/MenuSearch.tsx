import { SearchOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import { useState } from 'react';

export default function MenuSearch() {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <div className="box-content w-[249px] h-[38px] ml-[8px] mr-[8px]">
      <div className="mb-[6px] mr-[2px] w-full h-[32px] bg-white rounded">
        <div
          className="pl-[8px] pr-[6px] flex h-full cursor-pointer items-center group"
          onClick={showLoading}
        >
          <SearchOutlined style={{ fontSize: '18px', color: '#d2d8dc' }} />
          <span className="pl-[6px] pr-[2px] text-placeholder">搜索</span>
          <span className="text-placeholder hidden group-hover:block ml-auto">
            Ctrl + J
          </span>
        </div>
        <Modal
          title={<p>Loading Modal</p>}
          footer={
            <Button type="primary" onClick={showLoading}>
              Reload
            </Button>
          }
          loading={loading}
          open={open}
          onCancel={() => setOpen(false)}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    </div>
  );
}
