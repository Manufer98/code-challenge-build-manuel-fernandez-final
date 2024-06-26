'use client'
import React, { useId, useState, useEffect } from 'react'
import { useFormik } from 'formik';
import { addContactSchema } from '@/app/(auth)/schema/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@/hooks/auth';
import axios from '@/lib/axios';
import { storage } from '../../../../config/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import AddressForm from '../../address/AddressForm';
import Input from '../components/Input';
import GoBack from '@/components/GoBack';

const page = () => {
  const { push } = useRouter();
  const { user } = useAuth({ middleware: 'auth' });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedPicture, setSelectedPicture] = useState('');
  const id = useId()
  const [address, setAddress] = useState('')
  const noPhoto = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQyIUo7o9OTjhLasrpJkfCnrShHn07dHbCNDbW76bt4Q&s'


  useEffect(() => {
    handleUpload();
  }, [selectedImages])


  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const updatedSelectedImages = [];
    const updatedSelectedImageNames = [];

    for (let i = 0; i < files.length; i++) {
      updatedSelectedImages.push(files[i]);
      updatedSelectedImageNames.push(files[i].name);
    }

    setSelectedImages(updatedSelectedImages);





  };



  const handleUpload = async () => {
    setIsLoading(true);

    if (selectedImages.length > 0) {
      for (let i = 0; i < selectedImages.length; i++) {
        const image = selectedImages[i];
        const imageRef = ref(storage, image.name + id);

        try {
          const snapshot = await uploadBytes(imageRef, image);
          const downloadUrl = await getDownloadURL(snapshot.ref);
          setSelectedPicture(downloadUrl);

          toast.success('image uploaded', {
            position: 'top-center',
            autoClose: 3000,
            theme: 'dark',
          });

          setIsLoading(false);
        } catch (e) {
          setIsLoading(false);
          console.log('error uploading image:', e)
        }
      }
    } else {

      setIsLoading(false);
    }
  }



  const onSubmit = async (values, actions) => {


    const profile = selectedPicture.length > 0 ? selectedPicture : noPhoto;

    const contact = {
      user_id: user.id,
      name: values.name,
      title: values.title,
      address: address,
      profilePic: profile,
      phone: values.phone,
      email: values.email
    }
    axios.post('/api/contact', contact).then((response) => {

      toast.success('Contact Added', {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
      })


      push('/dashboard')
    }).catch(e => {
      toast.error(e.response.data.message, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
      })

    })

  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {

      name: "",
      title: "",
      profilePic: "",
      address: "",
      phone: "",
      email: "",
    },
    validationSchema: addContactSchema,
    onSubmit,
  });


  return (
    <div className='h-screen bg-secondary'>

      <div className='bg-pink h-16 flex'>
        <GoBack />
      </div>

      <div className='flex items-center justify-center pt-5'>
        <div className=' w-3/4 h-40 flex flex-col items-center justify-center pt-48  bg-gray-200  h-50 rounded-lg relative'>

          <img className="shadow rounded-full w-24 h-24 border-solid border-2 border-black" src={selectedPicture.length > 0 ? selectedPicture : noPhoto} alt="..." />
          <h2 className='text-xl font-bold'></h2>
          <h2 className='text-gray-400'></h2>
        </div>
      </div>

      <div className='flex  items-center justify-center pt-24'>

        <form onSubmit={handleSubmit} className='flex flex-row flex-wrap  border-dashed border-red-500'>
          <div className='sm:basis-2/4 w-full  flex flex-col items-center justify-center'>
            <Input onChange={handleChange} id='name' title='Name'
              onBlur={handleBlur} value={values.name} errors={errors.name} touched={touched.name} />

            <Input onChange={handleChange} id='title' title='Title'
              onBlur={handleBlur} value={values.title} errors={errors.title} touched={touched.title} />
            <div>
              <h5 className='font-medium'>Profile Picture</h5>

              <input onChange={handleImageUpload} class="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="default_size" type="file"></input>
            </div>
          </div>

          <div className='sm:basis-2/4 w-full flex flex-col items-center justify-center'>
            <div>
              <h5 className='font-medium'>Address</h5>
              <AddressForm
                address={address}
                setAddress={setAddress}
              />
            </div>

            <Input onChange={handleChange} id='phone' title='Phone'
              onBlur={handleBlur} value={values.phone} errors={errors.phone} touched={touched.phone} />

            <Input onChange={handleChange} id='email' title='Email'
              onBlur={handleBlur} value={values.email} errors={errors.email} touched={touched.email} />
          </div>

          <div className=' w-full flex justify-center pt-5'>
            <button
              onSubmit={onSubmit}
              type='submit'
              className="bg-primary hover:bg-blue-700 text-white font-bold py-2  px-12 rounded-full m-3"
            >
              Save</button>
            <Link
              href='/dashboard'
              className="bg-primary hover:bg-blue-700 text-white font-bold py-2  px-12 rounded-full m-3"
            >
              Cancel</Link>

          </div>
        </form>

      </div>
    </div>
  )
}

export default page