import { AiOutlineSearch, AiFillFacebook } from "react-icons/ai"
import { IoIosNotifications } from "react-icons/io"
import { CgAttachment } from "react-icons/cg"
import { MdDeleteSweep, MdOutlineEditNote, MdAdd } from "react-icons/md"
import { LuView } from "react-icons/lu"
import { GiSandsOfTime } from "react-icons/gi"
import { BiCalendarCheck, BiSort } from "react-icons/bi"
import { SiTask } from "react-icons/si"
import { GoKebabHorizontal } from "react-icons/go"
import { ImSpinner9 } from "react-icons/im"
import { RxCross2, RxDownload } from "react-icons/rx"
import { BsArrowRightShort, BsCheck2, BsFilterRight } from "react-icons/bs"
import { FcGoogle, FcCalendar } from "react-icons/fc"
import { GrFormNext, GrFormPrevious, GrActions, GrAddCircle } from "react-icons/gr"

const customIcons = {
    search: AiOutlineSearch,
    notification: IoIosNotifications,
    kebab: GoKebabHorizontal,
    next: GrFormNext,
    prev: GrFormPrevious,
    action: GrActions,
    add: GrAddCircle,
    formAdd: MdAdd,
    attach: CgAttachment,
    check: BsCheck2,
    edit: MdOutlineEditNote,
    view: LuView,
    delete: MdDeleteSweep,
    google: FcGoogle,
    facebook: AiFillFacebook,
    calender: FcCalendar,
    task: SiTask,
    googleCalenda: BiCalendarCheck,
    timer: GiSandsOfTime,
    arrow: BsArrowRightShort,
    cross: RxCross2,
    spinner: ImSpinner9,
    filter: BsFilterRight,
    sort: BiSort,
    download: RxDownload,
}

export default customIcons;