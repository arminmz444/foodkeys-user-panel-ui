import { useState } from 'react';
import { IoMdRefreshCircle } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { setCredit } from '@/store/walletSlice';
import useAxiosPrivate from '@/hooks/use-axios-private';
import { RootState } from '@/store/store';

const WalletSection = () => {
  const _axios = useAxiosPrivate();
  const wallet = useSelector((state: RootState) => state.wallet);
  const [isLoading, setIsLoading] = useState(false);
  const [actualCredit, setActualCredit] = useState(0);
  const dispatch = useDispatch();
  const fetchWalletCredit = async () => {
    try {
      const response = await _axios.get('/user/credit');
      if (response.data.status === 'SUCCESS') {
        setActualCredit(response.data.data);
        dispatch(setCredit(response.data.data));
      }
    } catch (error) {
      console.error('Error fetching wallet credit:', error);
    }
  };
  const handleRefresh = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await fetchWalletCredit();
    } catch (error) {
      console.error('Error refreshing wallet credit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-300 px-2.5 pb-5 pt-1">
      <div>کیف پول: {wallet.credit} تومان</div>
      <div>
        <IoMdRefreshCircle
          size="30"
          className={`cursor-pointer transition-transform ${
            isLoading
              ? 'animate-spin text-gray-400'
              : 'text-gray-500 hover:scale-105 active:scale-95'
          }`}
          onClick={handleRefresh}
        />
      </div>
    </div>
  );
};

export default WalletSection;
