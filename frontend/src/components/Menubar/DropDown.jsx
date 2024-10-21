import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  HamburgerMenuIcon,
  PersonIcon,
  ExitIcon,
  FrameIcon,
} from "@radix-ui/react-icons";
import "./Dropdown.css";
import useLogout from "../../hooks/useLogout";
import { Link } from "react-router-dom";

const DropDown = () => {
  const { loading, logout } = useLogout();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="IconButton" aria-label="Customise options">
          <HamburgerMenuIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent mr-7" sideOffset={5}>
          <DropdownMenu.Item className="DropdownMenuItem">
            Profile{" "}
            <div className="RightSlot">
              <PersonIcon />
            </div>
          </DropdownMenu.Item>
          <Link to="/pricing">
            <DropdownMenu.Item className="DropdownMenuItem">
              Pricing{" "}
              <div className="RightSlot">
                <FrameIcon />
              </div>
            </DropdownMenu.Item>
          </Link>

          <DropdownMenu.Separator className="DropdownMenuSeparator" />

          <DropdownMenu.Item onClick={logout} className="DropdownMenuItem">
            Logout{" "}
            <div className="RightSlot">
              <ExitIcon />
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropDown;
