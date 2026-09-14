import { useState } from "react";
import { numToBinary } from "../../components/utils";

function BinaryConversion() {
	const [Test128,setTest128] = useState(0)
    const [Test64,setTest64] = useState(0)
    const [Test32,setTest32] = useState(0)
    const [Test16,setTest16] = useState(0)
    const [Test8,setTest8] = useState(0)
    const [Test4,setTest4] = useState(0)
    const [Test2,setTest2] = useState(0)
    const [Test1,setTest1] = useState(0)
    const [inputC,setInputC] = useState("")

	let aux
    function testsum(num: number) {
        setTest128(0)
        setTest64(0)
        setTest32(0)
        setTest16(0)
        setTest8(0)
        setTest4(0)
        setTest2(0)
        setTest1(0)
        aux = num
        if (aux >= 128) {setTest128(1); aux -= 128}
        if (aux >= 64) {setTest64(1); aux -= 64}
        if (aux >= 32) {setTest32(1); aux -= 32}
        if (aux >= 16) {setTest16(1); aux -= 16}
        if (aux >= 8) {setTest8(1); aux -= 8}
        if (aux >= 4) {setTest4(1); aux -= 4}
        if (aux >= 2) {setTest2(1); aux -= 2}
        if (aux >= 1) {setTest1(1); aux -= 1}
    }
    const handleChangeTest = (e: any) => {
        testsum(e.target.value)
    }
    const handleChangeConversion = (e: any) => {
        setInputC(numToBinary(parseInt(e.target.value)))
    }

  	return (
    	<div className="p-8 flex flex-col md:flex-row gap-8 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      		<section className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col gap-6">
        		<h1 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mb-6">
        		  	basic Binary Conversion to 2^7
        		</h1>
        		<div className="grid grid-cols-8 gap-2 text-center mb-8 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
        		  	<div className="flex flex-col">
        		    	<span className="font-bold text-lg">128</span>
        		    	<span className="font-mono text-gray-500">{Test128}</span>
        		  	</div>
        		  	<div className="flex flex-col">
        		    	<span className="font-bold text-lg">64</span>
        		    	<span className="font-mono text-gray-500">{Test64}</span>
        		  	</div>
        			<div className="flex flex-col">
        			    <span className="font-bold text-lg">32</span>
        			    <span className="font-mono text-gray-500">{Test32}</span>
        			</div>
        		  	<div className="flex flex-col">
        		  	  	<span className="font-bold text-lg">16</span>
        		  	  	<span className="font-mono text-gray-500">{Test16}</span>
        		  	</div>
        		  	<div className="flex flex-col">
        		    	<span className="font-bold text-lg">8</span>
        		    	<span className="font-mono text-gray-500">{Test8}</span>
        		  	</div>
        		  	<div className="flex flex-col">
        		    	<span className="font-bold text-lg">4</span>
        		    	<span className="font-mono text-gray-500">{Test4}</span>
        		  	</div>
        		  	<div className="flex flex-col">
        		    	<span className="font-bold text-lg">2</span>
        		    	<span className="font-mono text-gray-500">{Test2}</span>
        		  	</div>
        		  	<div className="flex flex-col">
        		    	<span className="font-bold text-lg">1</span>
        		    	<span className="font-mono text-gray-500">{Test1}</span>
        		  	</div>
        		</div>

		        <div className="flex flex-col gap-2 max-w-xs">
          			<label className="text-sm font-bold uppercase tracking-wider text-gray-500">
          			  	Input
          			</label>
          			<input
            			type="number"
            			onChange={handleChangeTest}
            			value={aux}
            			className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          			/>
        		</div>
      		</section>
      		<hr className="border-t-2 border-gray-200 dark:border-gray-700 my-10" />
		    <section className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col gap-6">
        		<h1 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-6">
        		  	Binary conversion to 2^n
        		</h1>
        		<div className="flex flex-col md:flex-row gap-8 items-start">
          			<div className="flex flex-col gap-2 w-full max-w-xs">
            			<label className="text-sm font-bold uppercase tracking-wider text-gray-500">
            			  	Input
            			</label>
            			<input
            			  type="number"
            			  onChange={handleChangeConversion}
            			  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            			/>
          			</div>

          			<div className="flex flex-col gap-2 w-full max-w-xs">
          		  		<h1 className="text-sm font-bold uppercase tracking-wider text-gray-500">
          		    		Output
          		  		</h1>
          		  		<div className="w-full h-10 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 font-mono flex items-center overflow-x-auto">
          		    		{inputC}
          		  		</div>
          			</div>
        		</div>
      		</section>
    	</div>
  	);
}

export default BinaryConversion;
