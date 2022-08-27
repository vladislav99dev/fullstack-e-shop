import NavBar from './components/NavBar/NavBar.js'

function App() {
  return(
    <div id='container'>
      <NavBar /> 
      <div id='main' className='flex justify-center mt-10'>
            <div className='h-[48rem] w-[25%] bg-white rounded-xl border-4 border-[#00df9a]'></div>
      </div> 
    </div>

  )
}

export default App;
