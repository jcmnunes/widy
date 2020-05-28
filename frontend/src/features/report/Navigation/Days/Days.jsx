import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDays } from '../../Report.actions';
import { daysLoadingSelector } from '../../Report.selectors';
import LoadingNavigation from './LoadingNavigation';

const Days = () => {
  const daysLoading = useSelector(daysLoadingSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDays());
  }, [dispatch]);

  return daysLoading ? <LoadingNavigation /> : <div />;
};

export default Days;
