
import React from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" }
  // Add more languages as needed.
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <Languages className="h-5 w-5 text-primary-900" />
      <select
        value={i18n.language}
        onChange={e => i18n.changeLanguage(e.target.value)}
        className="border rounded px-2 py-1 text-sm bg-white text-primary-900"
      >
        {LANGUAGES.map(lang => (
          <option key={lang.code} value={lang.code}>{lang.label}</option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
