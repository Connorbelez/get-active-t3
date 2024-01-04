// // TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com 
// import { Timepicker, Input, initTE } from "tw-elements";
// initTE({ Timepicker, Input }, { allowReinits: true });
  
// const picker = document.querySelector("#timepicker-format");
// const tpFormat24 = new Timepicker(picker, {
// format24: true,
// });


  
// interface compProps {
//     value: string;
//     setValue: (value: string) => void;
// }
  
// export default function comp({value,setValue}:  compProps) {

// return (
//     <div
//         className="relative"
//         data-te-format24="true"
//         id="timepicker-format"
//         data-te-input-wrapper-init>
//         <input
//             type="text"
//             className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
//             data-te-toggle="timepicker"
//             id="form14" 
//             value={value}
//             onChange={(e) => setValue(e.target.value)}
//         />
//         <label htmlFor="form14"
//             className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
//         >Select a time</label>
//     </div>
// )
// }