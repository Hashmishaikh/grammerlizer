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
        <Link to="/profile">
          <DropdownMenu.Item className="DropdownMenuItem text-xl">
            Profile{" "}
            <div className="RightSlot">
              <PersonIcon width={20} height={20}/>
            </div>
          </DropdownMenu.Item>
          </Link>
          {/* <Link to="/pricing">
            <DropdownMenu.Item className="DropdownMenuItem">
              Pricing{" "}
              <div className="RightSlot">
                <FrameIcon />
              </div>
            </DropdownMenu.Item>
          </Link> */}

          {/* <DropdownMenu.Separator className="DropdownMenuSeparator" /> */}

          <DropdownMenu.Item onClick={logout} className="DropdownMenuItem text-xl">
            Logout{" "}
            <div className="RightSlot">
              <ExitIcon width={20} height={20}/>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropDown;
