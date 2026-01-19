// components/TopBar.tsx
import ActionButtons from "../commonComponent/TopActionBar/ActionButtons";
import PhoneDropdown from "../commonComponent/TopActionBar/PhoneDropdown";

interface TopBarProps {
  status: any;
  phoneOpen: boolean;
  handlePhoneClick: () => void;
  closePhone: () => void;
  providers: {
    transporter_name: string;
    transporter_name_amh: string;
    phone: string;
  }[];
}

export default function TopBar({
  status,
  phoneOpen,
  handlePhoneClick,
  providers,
  closePhone,
}: TopBarProps) {
  return (
    <div
      className={`fixed top-16 left-0 w-full p-4 shadow-md ${
        status.setting?.theme === "light" ? "bg-gray-50" : "bg-gray-700"
      } flex justify-between items-center z-30`}
    >
      <ActionButtons
        status={status}
        handlePhoneClick={handlePhoneClick}
        action={2}
        place={2}
      />
      <PhoneDropdown
        phoneOpen={phoneOpen}
        providers={providers}
        status={status}
        onClose={closePhone}
      />
    </div>
  );
}
