export const cars = [
  {
    id: 1,
    name: 'Hyundai Grand i 10 Sedan',
    price: 90,
    brand: 'Hyundai',
    image: 'https://economycarrental.com.ky/wp-content/uploads/2017/01/Economy-Rental-Car-Grand-I-10.jpg',
    type: ['Compact'],
    category: 'standard',
    rating: 4.2,
    specs: {
      doors: 4,
      seats: 5,
      transmission: 'Automatic',
      airConditioning: true,
      luggage: 2
    },
    features: {
      bluetooth: true,
      radio: true,
      camera: 'Back-up',
      mileage: '30 MPG',
      appleCarplay: true,
      androidAuto: true
    }
  },
  {
    id: 2,
    name: 'Hyundai i 20',
    price: 45,
    brand: 'Hyundai',
    image: 'https://economycarrental.com.ky/wp-content/uploads/2017/01/i20.jpg',
    type: ['Compact'],
    category: 'standard',
    rating: 4,
    specs: {
      doors: 4,
      seats: 5,
      transmission: 'Manual',
      airConditioning: true,
      luggage: 2
    },
    features: {
      bluetooth: true,
      radio: true,
      camera: 'None',
      mileage: '32 MPG',
      appleCarplay: false,
      androidAuto: false
    }
  },
  {
    id: 3,
    name: 'Hyundai Grand i 10',
    price: 80,
    brand: 'Hyundai',
    image: 'https://economycarrental.com.ky/wp-content/uploads/2017/01/prestige-motors-hyundai-i10-main-1.jpg',
    type: ['Intermediate'],
    category: 'standard',
    rating: 5,
    specs: {
      doors: 4,
      seats: 5,
      transmission: 'Automatic',
      airConditioning: true,
      luggage: 2
    },
    features: {
      bluetooth: false,
      radio: true,
      camera: 'None',
      mileage: '33 MPG',
      appleCarplay: false,
      androidAuto: false
    }
  },
  {
    id: 4,
    name: 'Hyundai Grand i 10 Sedan',
    price: 90,
    brand: 'Hyundai',
    image: 'https://economycarrental.com.ky/wp-content/uploads/2017/01/Economy-Rental-Car-Grand-I-10.jpg',
    type: ['Intermediate'],
    category: 'standard',
    rating: 4.2,
    specs: {
      doors: 4,
      seats: 5,
      transmission: 'Automatic',
      airConditioning: true,
      luggage: 2
    },
    features: {
      bluetooth: true,
      radio: true,
      camera: 'Back-up',
      mileage: '30 MPG',
      appleCarplay: true,
      androidAuto: true
    }
  },
  {
    id: 5,
    name: 'Hyundai Accent',
    brand: 'Hyundai',
    price: 100,
    image: 'https://economycarrental.com.ky/wp-content/uploads/2017/01/economy-discount-car-rental-2018-hyundai-accent-ext3.jpg',
    type: ['Full-Size'],
    category: 'standard',
    rating: 5,
    specs: {
      doors: 4,
      seats: 5,
      transmission: 'Automatic',
      airConditioning: true,
      luggage: 3
    },
    features: {
      bluetooth: true,
      radio: true,
      camera: 'Back-up',
      mileage: '34 MPG',
      appleCarplay: true,
      androidAuto: true
    }
  },
  {
    id: 6,
    name: 'SsangYoung Tivoli',
    price: 110,
    brand: 'SsangYoung',
    image: 'https://economycarrental.com.ky/wp-content/uploads/2017/01/ssangyong-tivoli.jpg',
    type: ['Full-Size'],
    category: 'commercial',
    rating: 5,
    specs: {
      doors: 4,
      seats: 5,
      transmission: 'Automatic',
      airConditioning: true,
      luggage: 3
    },
    features: {
      bluetooth: true,
      radio: true,
      camera: '360',
      mileage: '28 MPG',
      appleCarplay: true,
      androidAuto: true
    }
  }
]

export const brandOptions = [{
  name: 'Any Brand',
  value: 'Any Brand'
}, {
  name: 'Hyundai',
  value: '1a7ebf6c-5f0e-4b1d-90eb-032871814fc5'
}, {
  name: 'SsangYoung',
  value: '56856f81-bcab-4b3a-adf8-7a449621a6ff'
}, {
  name: 'GWM',
  value: 'c487439e-285c-4c9c-9673-f7adcb730c6a'
}]


export const typeOptions = [{
  name: 'Any Type',
  value: 'Any Type'
}, {
  name: 'Economy Hatchback',
  value: 'f95923f5-64b8-4b4a-a060-67b23adbfe3b'
}, {
  name: 'Compact Hatchback',
  value: '167a0a6c-028b-4dd5-a3ef-7c32de8feb5f'
}, {
  name: 'Mid-Size Sedan',
  value: '4e023107-d53d-4f47-a2a1-82c1372f8a7f'
}, {
  name: 'Full-Size Sedan',
  value: '30b93149-6c01-4482-bf69-2ace226d1e2e'
}, {
  name: 'Full-Size Sedan/SUV',
  value: 'c50fd84d-8e19-4b03-8c0b-2110f5db9d36'
}, {
  name: 'Mid-Size SUV',
  value: '895e403c-89db-48e7-b781-cbd88772d111'
}, {
  name: 'Standard-SUV',
  value: '22ce94f8-0a23-4cc9-8382-2d144bb5c430'
}, {
  name: 'Passenger Van',
  value: '493807f1-6059-4bc2-aacb-56add38695cb'
}, {
  name: 'Commercial Panel-Van',
  value: '7ad45248-c1b1-45ff-9eea-98805674050a'
}, {
  name: 'Commercial Flatbed Truck',
  value: '9c6dc9fb-31ab-4172-af7b-bfe7e0074bac'
}, {
  name: 'Small Pickup Truck',
  value: 'd0767bdd-8429-4805-9156-a3c6277203d8'
}, {
  name: 'Mid-Size Pickup Truck',
  value: '6d332213-a698-4598-a987-059d3e1babfd'
}]

export const typeOptionsShort = [{
  name: 'Economy',
  value: 'f95923f5-64b8-4b4a-a060-67b23adbfe3b'
}, {
  name: 'Compact',
  value: '167a0a6c-028b-4dd5-a3ef-7c32de8feb5f'
}, {
  name: 'Mid-Size Sedan',
  value: '4e023107-d53d-4f47-a2a1-82c1372f8a7f'
}, {
  name: 'Full-Size Sedan',
  value: '30b93149-6c01-4482-bf69-2ace226d1e2e'
}, {
  name: 'Full-Size Sedan/SUV',
  value: 'c50fd84d-8e19-4b03-8c0b-2110f5db9d36'
}, {
  name: 'Standard-SUV',
  value: '22ce94f8-0a23-4cc9-8382-2d144bb5c430'
}, {
  name: 'Passenger Van',
  value: '493807f1-6059-4bc2-aacb-56add38695cb'
},{
  name: 'Pickup Truck',
  value: '6d332213-a698-4598-a987-059d3e1babfd'
}]


export const allStatus = [{
    label: 'Active',
    value: 'active'
}, {
    label: 'Inactive',
    value: 'inactive'
}, {
    label: 'Suspended',
    value: 'suspended'
}]

export const roles = [{
    label: 'Admin',
    value: 'admin'
}, {
    label: 'Staff',
    value: 'staff'
}, {
    label: 'Customer',
    value: 'customer'
}]

export const sortVehicles = [{
    label: 'Year',
    value: 'year'
}, {
    label: 'Model',
    value: 'model'
},
]