import { Select } from "antd";
import { FC } from "react";
import { UserFilters } from "../../../types/users";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { setFilters } from "../../../store/slices/users-slice";
import { FilterOutlined } from "@ant-design/icons";

type StatusFilter = "all" | "active" | "blocked";

interface BlockingFilterProps {
  filters: UserFilters;
}

const BlockingFilter: FC<BlockingFilterProps> = ({ filters }) => {
  const dispatch = useDispatch<AppDispatch>();

  const options = [
    { label: "Все", value: "all" },
    { label: "Активные", value: "active" },
    { label: "Заблокированные", value: "blocked" },
  ];

  const value: StatusFilter =
    filters.isBlocked === undefined ? "all" : filters.isBlocked ? "blocked" : "active";

  const handleChange = (value: StatusFilter) => {
    const isBlocked = value === "all" ? undefined : value === "blocked";

    dispatch(setFilters({ ...filters, isBlocked }));
  };

  return (
    <Select
      options={options}
      value={value}
      style={{ width: 200 }}
      size="large"
      prefix={<FilterOutlined style={{ color: "#595959" }} />}
      onChange={handleChange}
    />
  );
};

export default BlockingFilter;
