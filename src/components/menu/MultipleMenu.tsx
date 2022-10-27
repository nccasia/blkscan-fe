import { Item } from "@/components/layout/Header";
import UnstyledLink from "@/components/links/UnstyledLink";

type Props = {
  menu: Item[]
}
const MultipleMenu: React.FC<Props> = ({ menu }) => {
  return (
    <ul className="bg-white px-4 py-4 mt-3 border-t-[3px] border-header-item-hover">
      {menu && menu.length > 0 && menu.map((item, index) =>
        <li className="px-1 py-[0.5rem]" key={index}>
          <UnstyledLink href={item.link}
            className='text-header-item text-sm hover:text-header-item-hover'
          >
            {item.title}
          </UnstyledLink>
        </li>
      )}
    </ul>
  )
}

export default MultipleMenu;