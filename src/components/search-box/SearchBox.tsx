import { BiSearch } from 'react-icons/bi';
const SearchBox = () => {
  return (
    <form className='flex items-stretch'>
      <select id="filter" className='pr-6 text-sm text-[#1e2022] focus:ring-0 rounded-l border-[#d5dae2] hidden md:block'>
        <option value="all">All Filter</option>
        <option value="addresses">Addresses</option>
        <option value="tokens">Tokens</option>
        <option value="names">Name Tags</option>
        <option value="labels" selected>Labels</option>
        <option value="websites" selected>Websites</option>
      </select>
      <input type="text" placeholder="Search by Address / Txn Hash / Block / Token / Ens"
        className='text-[0.875rem] px-[0.65rem] text-[#1e2022] focus:ring-0 flex-1 border-[#d5dae2]'
      />
      <button className='bg-[#3498db] border-[#d5dae2] text-white py-[0.6rem] px-[1.125rem] rounded-r flex flex-col justify-center cursor-pointer'>
        <BiSearch />
      </button>
    </form>
  )
}

export default SearchBox;