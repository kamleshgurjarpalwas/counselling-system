import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Menu, ChevronDown } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  {
    name: "Information",
    dropdown: [
      { name: "Timetable", path: "/timetable" },
      { name: "Business Rules", path: "/rules" },
      { name: "Restricted Institutes", path: "/restricted-institutes" },
    ],
  },
  {
    name: "eServices",
    dropdown: [
      { name: "Seat Matrix", path: "/seat-matrix" },
      { name: "Participating Institutes", path: "/institutes" },
      { name: "Opening & Closing Rank", path: "/opening-closing-rank" },
    ],
  },
  { name: "Documents", path: "/documents" },
  { name: "Institute Tour", path: "/institute-tour" },
  { name: "Helpdesk", path: "/helpdesk" },
  { name: "Contact Us", path: "/contact" },
  { name: "About Us", path: "/about" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleDropdown = (index) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <header className="bg-white shadow-md mb-8">
      <nav className="max-w-7xl container mx-auto flex justify-between items-center py-0">
        <ul className="hidden md:flex space-x-8 text-gray-700">
          {navItems.map((item, index) =>
            item.dropdown ? (
              <div
                key={index}
                className="relative py-4 cursor-pointer hover:text-blue-600"
                onMouseEnter={() => setHoveredDropdown(index)}
                onMouseLeave={() => setHoveredDropdown(null)}
              >
                <DropdownMenu open={hoveredDropdown === index}>
                  <DropdownMenuTrigger className="flex items-center gap-1 cursor-pointer border-0 outline-0">
                    {item.name} <ChevronDown size={16} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="relative bg-white shadow-lg rounded-md mt-2 w-40">
                    {item.dropdown.map((subItem, subIndex) => (
                      <DropdownMenuItem key={subIndex} className="mt-1 mb-1 hover:bg-blue-600">
                        <Link to={subItem.path}>{subItem.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <li key={index} className="py-4 cursor-pointer hover:text-blue-600">
                <Link to={item.path}>{item.name}</Link>
              </li>
            )
          )}
        </ul>

        <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
          <DialogTrigger asChild>
            <Button className="hidden md:block border-2 cursor-pointer h-full rounded-none text-blue-600 border-blue-600 bg-transparent hover:bg-blue-600  hover:text-white duration-100">
              Student Login
            </Button>
          </DialogTrigger>
          <DialogContent className="w-sm mx-auto">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-semibold">
                Student Login
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="application-number">Application Number</Label>
                <Input className="rounded-none" id="application-number" type="text" placeholder="Enter Application Number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input className="rounded-none" id="password" type="password" placeholder="Enter Password" />
              </div>
              <div className="flex justify-between text-sm">
                <Link to="/forgot-password" onClick={()=>isLoginOpen(false)} className="text-blue-500 hover:underline">
                  Forgot Password?
                </Link>
                <Link to="/register" onClick={()=>isLoginOpen(false)} className="text-blue-500 hover:underline">
                  New Student? Register
                </Link>
              </div>
              <Button className="w-full rounded-none cursor-pointer bg-blue-600 hover:bg-blue-600 text-white">
                Login
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="md:hidden flex justify-between w-full items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost">
                <Menu size={28} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-4">
              <ul className="space-y-4 text-gray-700 text-left">
                {navItems.map((item, index) => (
                  <React.Fragment key={index}>
                    {!item.dropdown ? (
                      <li>
                        <Link to={item.path} onClick={() => setIsOpen(false)}>
                          {item.name}
                        </Link>
                      </li>
                    ) : (
                      <>
                        <li
                          className="flex justify-between items-center font-semibold cursor-pointer"
                          onClick={() => toggleDropdown(index)}
                        >
                          {item.name}
                          <ChevronDown
                            size={16}
                            className={`transition-transform ${
                              openDropdowns[index] ? "rotate-180" : ""
                            }`}
                          />
                        </li>
                        {openDropdowns[index] && (
                          <ul className="pl-4 space-y-2 mt-2">
                            {item.dropdown.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  to={subItem.path}
                                  onClick={() => setIsOpen(false)}
                                  className="block"
                                >
                                  {subItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </SheetContent>
          </Sheet>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="border-2 h-8 rounded-none text-blue-600 border-blue-600 bg-transparent hover:bg-blue-600 hover:text-white duration-100">
                Student Login
              </Button>
            </DialogTrigger>
            <DialogContent className="w-sm mx-auto">
              <DialogHeader>
                <DialogTitle className="text-center text-xl font-semibold">
                  Student Login
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Label htmlFor="mobile-application-number">Application Number</Label>
                <Input  className="rounded-none" id="mobile-application-number" type="text" placeholder="Enter Application Number" />
                <Label htmlFor="mobile-password">Password</Label>
                <Input className="rounded-none"  id="mobile-password" type="password" placeholder="Enter Password" />
                <div className="flex justify-between text-sm">
                <Link to="/forgot-password" onClick={()=>isLoginOpen(false)} className="text-blue-500 hover:underline">
                  Forgot Password?
                </Link>
                <Link to="/register" onClick={()=>isLoginOpen(false)} className="text-blue-500 hover:underline">
                  New Student? Register
                </Link>
              </div>
              <Button className="w-full rounded-none cursor-pointer bg-blue-500 hover:bg-blue-600 text-white">
                Login
              </Button>
            </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
