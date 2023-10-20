import { AiOutlineSearch } from "react-icons/ai"
import { IoIosNotifications } from "react-icons/io"
import { CiMenuKebab } from "react-icons/ci"
import { MdOutlineFilterList } from "react-icons/md"
import { CgAttachment } from "react-icons/cg"
import { GoCheckCircle } from "react-icons/go"
import { BiCheck } from "react-icons/bi"
import { BsChevronDown } from "react-icons/bs"
import { GrFormNext, GrFormPrevious, GrActions, GrAddCircle } from "react-icons/gr"

const customIcons = {
    search: AiOutlineSearch,
    notification: IoIosNotifications,
    kebab: CiMenuKebab,
    next: GrFormNext,
    prev: GrFormPrevious,
    action: GrActions,
    add: GrAddCircle,
    attach: CgAttachment,
    check: BiCheck,
    filter2: MdOutlineFilterList,
    circleCheck: GoCheckCircle,
    down: BsChevronDown
}

export default customIcons;