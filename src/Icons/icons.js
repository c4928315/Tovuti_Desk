import { AiOutlineSearch } from "react-icons/ai"
import { IoIosNotifications, IoMdAdd } from "react-icons/io"
import { CiMenuKebab } from "react-icons/ci"
import { MdOutlineFilterList, MdDelete, MdEdit, MdOutlineAttachFile } from "react-icons/md"
import { CgAttachment } from "react-icons/cg"
import { GoCheckCircle } from "react-icons/go"
import { BiCheck, BiSolidUserCircle } from "react-icons/bi"
import { BsChevronDown, BsCardList, BsFillShareFill } from "react-icons/bs"
import { GrFormNext, GrFormPrevious, GrActions, GrAddCircle, GrFormAdd } from "react-icons/gr"

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
    down: BsChevronDown,
    delete: MdDelete,
    edit: MdEdit,
    attach: MdOutlineAttachFile,
    card: BsCardList,
    share: BsFillShareFill,
    plus: IoMdAdd,
    user: BiSolidUserCircle

}

export default customIcons;