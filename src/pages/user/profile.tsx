import CardProfile from 'components/CardProfile';
import React from 'react';

function Profile() {
  return (
    <div className='flex h-full min-h-[90vh] flex-col items-center justify-center'>
      <CardProfile
        name='Pepito Perez'
        ci='10101010'
        email='pepito@gmail.com'
        date='10/10/1990'
        phone='70707070'
      />
    </div>
  );
}

export default Profile;
