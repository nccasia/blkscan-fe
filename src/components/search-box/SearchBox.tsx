import { BiSearch } from 'react-icons/bi';
const SearchBox = () => {
  return (
    <form className='flex items-stretch'>
      <select
        id='filter'
        className='hidden rounded-l border-[#d5dae2] pr-6 text-sm text-[#1e2022] focus:ring-0 md:block'
      >
        <option value='all'>All Filter</option>
        <option value='addresses'>Addresses</option>
        <option value='tokens'>Tokens</option>
        <option value='names'>Name Tags</option>
        <option value='labels' selected>
          Labels
        </option>
        <option value='websites' selected>
          Websites
        </option>
      </select>
      <input
        type='text'
        placeholder='Search by Address / Txn Hash / Block / Token / Ens'
        className='flex-1 border-[#d5dae2] px-[0.65rem] text-[0.875rem] text-[#1e2022] focus:ring-0'
      />
      <button className='flex cursor-pointer flex-col justify-center rounded-r border-[#d5dae2] bg-[#3498db] py-[0.6rem] px-[1.125rem] text-white'>
        <BiSearch />
      </button>
    </form>
  );
};

export default SearchBox;
