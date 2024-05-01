'use client'
import React, { useId, useState, useEffect } from 'react'
import { useFormik } from 'formik';
import { addContactSchema } from '@/app/(auth)/schema/yup';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from '@/lib/axios';
import { useSelector } from 'react-redux';
import AddressForm from '../../../address/AddressForm';
import { storage } from '../../../../../config/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import PopUpDelete from './PopUpDelete';
import Input from '../../components/Input';
import GoBack from '@/components/GoBack';

const page = ({ params }) => {
  const contactsRedux = useSelector((state) => state.contacts.contacts);
  const contacts = contactsRedux.filter(i => i.id === parseInt(params.id));
  const contact = contacts.reduce((acc, cur, i) => (acc = cur), {});
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedPicture, setSelectedPicture] = useState(contact.profilePic);
  const id = useId()
  const [address, setAddress] = useState(contact.address)
  const [popUpDelete, setPopUpDelete] = useState(false);

  const onSubmit = async (values, actions) => {


    const contact = {

      name: values.name,
      title: values.title,
      profilePic: selectedPicture,
      address: address,
      phone: values.phone,
      email: values.email
    }

    axios.put(`/api/contact/${params.id}`, contact).then((response) => {
      toast.success('Contact Updated', {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
      })
      push('/dashboard')

    }).catch(e => {
      
      if (e.response.status === 422) {
        toast.error(e.response.data.message, {
          position: 'top-center',
          autoClose: 5000,
          theme: 'dark',
        })
      } else {
        toast.error('Error Establishing a Database Connection', {
          position: 'top-center',
          autoClose: 5000,
          theme: 'dark',
        })

      }

    });

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

      name: contact.name,
      title: contact.title,
      profilePic: contact.profilePic,
      address: contact.address,
      phone: contact.phone,
      email: contact.email,
    },
    validationSchema: addContactSchema,
    onSubmit,
  });
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
          ('error uploading image:', e)
        }
      }
    } else {
      console.error('No images selected');
      setIsLoading(false);
    }
  }


  const handleDelete = (id) => {
    axios.delete(`/api/contact/${id}`).then((response) => {
      toast.success('Contact Deleted', {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
      })
      push('/dashboard')
    });


  }

  const handlePopUpDelete = () => {
    setPopUpDelete(!popUpDelete);
  }

  return (
    <div>

      {popUpDelete && <PopUpDelete setPopUpDelete={setPopUpDelete} onDelete={handleDelete} id={params.id} />}

      <div className='h-screen bg-secondary'>
        <div className='bg-pink h-16 flex justify-between'>
          <GoBack />
          <button
            onClick={handlePopUpDelete}
            className="bg-primary hover:bg-blue-700 text-white font-bold py-2  px-12 rounded-full m-3 "
          >
            Delete</button>
        </div>

        <div className='flex items-center justify-center pt-5'>
          <div className=' w-3/4 h-40 flex flex-col items-center justify-center pt-48  bg-gray-200  h-50 rounded-lg relative'>

            <img className="shadow rounded-full w-24 h-24 border-solid border-2 border-black  " src={selectedPicture} alt="..." />
            <h2 className='text-xl font-bold'>{contact.name}</h2>
            <h2 className='text-gray-400'>{contact.title}</h2>
          </div>

        </div>

        <div className='flex items-center justify-center pt-24 '>
          <form onSubmit={handleSubmit} className='flex flex-row flex-wrap items-center justify-center  border-dashed border-red-500'>
            <div className='sm:basis-2/4 w-full flex flex-col items-center justify-center'>

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

            <div className=' w-full  flex items-start  justify-center pt-5'>
              <button
                onSubmit={onSubmit}
                className="bg-primary hover:bg-blue-700 text-white font-bold py-2  px-12 rounded-full m-3 "
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

    </div>
  )
}

export default page