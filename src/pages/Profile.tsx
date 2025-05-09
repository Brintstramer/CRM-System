import { Result } from "antd";
import iconHappy from "../assets/iconHappy.png";

const ProfilePage = () => {
  return <Result icon={<img src={iconHappy} />} title="Привет!" />;
};

export default ProfilePage;
