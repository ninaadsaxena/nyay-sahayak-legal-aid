import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-6">
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <div className="bg-primary rounded-md p-1">
              <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <span className="font-poppins font-bold text-primary text-xl">{t("Nyay Sahayak")}</span>
          </a>
        </div>

        <nav className="hidden md:flex space-x-8">
          <a href="#contract-analysis" className="nav-link">{t("Contract Analysis")}</a>
          <a href="#issue-resolution" className="nav-link">{t("Issue Resolution")}</a>
          <a href="#law-reference" className="nav-link">{t("Law Reference")}</a>
          <a href="#lawyer-connect" className="nav-link">{t("Connect with Lawyers")}</a>
        </nav>

        <div className="hidden md:flex gap-2 items-center">
          <LanguageSwitcher />
          <Button className="button-primary">{t("Get Started")}</Button>
        </div>

        <button onClick={toggleMenu} className="md:hidden">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-md animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <a href="#contract-analysis" className="nav-link" onClick={toggleMenu}>{t("Contract Analysis")}</a>
            <a href="#issue-resolution" className="nav-link" onClick={toggleMenu}>{t("Issue Resolution")}</a>
            <a href="#law-reference" className="nav-link" onClick={toggleMenu}>{t("Law Reference")}</a>
            <a href="#lawyer-connect" className="nav-link" onClick={toggleMenu}>{t("Connect with Lawyers")}</a>
            <Button className="button-primary w-full">{t("Get Started")}</Button>
            <div className="mt-2">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
