import { NextPage } from "next";

const ActionButton: NextPage<{
  title: string;
  onClick: () => void;
  className: string;
  disabled: boolean;
}> = ({ title, onClick, className, disabled }) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};

export default ActionButton;
