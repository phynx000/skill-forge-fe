import { Input, Button } from "antd";
import { useState } from 'react';
import { SearchOutlined } from "@ant-design/icons";
import "./search.scss"

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");

  const onSearch = (value: string) => {
    console.log("Đang tìm:", value);
    // Gọi API, filter danh sách, hoặc điều hướng...
  };

  return (
    <div className="items-center">
      <Input.Search
        placeholder="Nhập tên khóa học"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onSearch={onSearch}
        enterButton={
          <Button
            type="primary"
            icon={<SearchOutlined />}
            style={{ backgroundColor: "#c800de", borderColor: "#c800de" }} // Xanh lá kiểu Tailwind: green-500
          >
            Tìm
          </Button>
        }
      // allowClear


      />
    </div>
  );
};


export default SearchBar;

