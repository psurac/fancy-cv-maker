import { FC } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { FaPeopleArrows } from "react-icons/fa6";
import { BsBriefcaseFill } from "react-icons/bs";
import { RiMessage2Fill } from "react-icons/ri";
import { GoBellFill } from "react-icons/go";
import { CgMenuGridR } from "react-icons/cg";

type LinkedinNavBarTyp = {
    className: string;
    imageURL: string;
}
const LinkedinNavBar: FC<LinkedinNavBarTyp> = ({ className, imageURL }) => {
    const size: number = 23;
    return (
        <div className={className}>
            <div className="icon">CV</div>
            <div className="symbole-group">
                <IoMdSearch size={size} />
                <span>Search</span>
            </div>
            <div className="symbole-group">
                <IoHome size={size} />
                <span>Start</span>
            </div>
            <div className="symbole-group">
                <FaPeopleArrows size={size} />
                <span>Network</span>
            </div>
            <div className="symbole-group">
                <BsBriefcaseFill size={size} />
                <span>Jobs</span>
            </div>
            <div className="symbole-group">
                <RiMessage2Fill size={size} />
                <span>News</span>
            </div>
            <div className="symbole-group">
                <GoBellFill size={size} />
                <span>Messages</span>
            </div>
            <div className="symbole-group img-container">
                <img src={imageURL} alt="You" />
                <span>You</span>
            </div>
            <div className="symbole-group">
                <CgMenuGridR size={size} />
                <span>Products</span>
            </div>
        </div>
    );
};

export default LinkedinNavBar