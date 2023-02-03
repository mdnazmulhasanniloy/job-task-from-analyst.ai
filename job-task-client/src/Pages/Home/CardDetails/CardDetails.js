import React from 'react';

const CardDetails = ({item}) => {
    const {email, phone, description, website, name, address, company} = item;
    return (
        <div className='mt-5 mx-5 p-3 border-4 border-gray-300 rounded'>
                  <div className='p-4'>
                    <h1 className='text-lg font-bold'>Description</h1>
                    <p className='mt-2'>{description}</p>
                    <div className="grid grid-cols-2 gap-4 mt-5">
                      <div>
                          <h1 className="text-lg font-bold">
                            Contact Person
                          </h1>
                           <p>{name}</p>
                      </div>

                      <div>
                          <h1 className="text-lg font-bold">
                            Address
                          </h1> 
                           <p>{address?.suite} {address?.city}, {address?.street}, {address?.zipcode}</p>
                      </div>
                      <div>
                          <h1 className="text-lg font-bold">
                            Designation
                          </h1>
                           <p>{company?.name}</p>
                      </div>
                      <div>
                          <h1 className="text-lg font-bold">
                            City
                          </h1>
                           <p>{address?.city}</p>
                      </div>
                      <div>
                          <h1 className="text-lg font-bold">
                            Email
                          </h1>
                           <p>{email}</p>
                      </div>
                      <div>
                          <h1 className="text-lg font-bold">
                            State
                          </h1>
                           <p>{address?.street}</p>
                      </div>
                      <div>
                          <h1 className="text-lg font-bold">
                            Phones
                          </h1>
                           <p>{phone}</p>
                      </div>
                      <div>
                          <h1 className="text-lg font-bold">
                            Country
                          </h1>
                           <p>India</p>
                      </div>

                        
                    </div>
                  </div>
              </div>
    );
};

export default CardDetails;