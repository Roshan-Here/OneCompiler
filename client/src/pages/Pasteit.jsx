import React from 'react'
import Footer from './../components/Footer';

function Pasteit() {
  return (
    <section>
      <div className='bg-gray-900 h-screen overflow-auto'>
        <div className='flex justify-between items-center'>
            <div className='flex justify-between p-5'>
                <h1 className='p-5'>Theme</h1>
                <h1 className='p-5'>Languages</h1>
            </div>
            {/* link will be hidden only active when getLink fetch saved -result */}
            <div className='flex justify-center '>
                <h1>link</h1>
            </div>
            <div className='flex p-5'>
                <h1>GetLink</h1>
            </div>
        </div>
        <div className='flex m-3 overflow-auto'>
            <div className='border p-3 border-cyan-400 w-full md:h-96 h-auto rounded-lg'>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi non quidem fugiat repellendus exercitationem nulla nisi eligendi, consectetur quam similique veritatis cum maiores mollitia nobis provident distinctio delectus temporibus dicta!</p>
            </div>
        </div>

      </div>
      <Footer/>
    </section>
  )
}

export default Pasteit
