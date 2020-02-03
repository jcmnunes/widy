import React from 'react';
import RenameTask from './RenameTask/RenameTask.container';
import AddTask from './AddTask/AddTask.container';
import RegisterTime from './RegisterTime/RegisterTime.container';
import LaunchTask from './LaunchTask/LaunchTask.container';

const Modals = () => {
  return (
    <>
      <RenameTask />
      <AddTask />
      <RegisterTime />
      <LaunchTask />
    </>
  );
};

export default Modals;
