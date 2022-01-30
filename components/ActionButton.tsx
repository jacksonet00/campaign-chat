import { NextPage } from "next";

const ActionButton: NextPage<{
  title: string;
  onClick: () => void;
  className: string;
}> = ({ title, onClick, className }) => {
  return (
    <button className={className} onClick={onClick}>
      {title}
    </button>
  );
};

export default ActionButton;
