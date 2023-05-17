import { useForm } from 'react-hook-form';
import "./style/index.css";

let renderCount = 0;

/*Strict mode intentionally triggers two renders to detect potential issues in the component's code.
 This double render is expected behavior in development mode and helps identify and warn about 
 certain problems, such as unintended side effects or inconsistent state.*/

function App() {
  const { register, handleSubmit, watch, formState: { errors, isValid} } 
        = useForm({
          defaultValues: {
            firstName:'',
            lastName:""
          }
        });

  renderCount++;
  console.log(errors);
  console.log(watch('email'));

  return (
    <div className="container">
      
      <form onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
      >
        <input 
          {...register('firstName', { required: 'This is required.', parttern: /^[A-Za-z]+$/i,minLength: { value: 4, message: 'Min length is 4'}})}
           placeholder='First Name'
           />
        <p>{errors.firstName?.message}</p>
        <input  
          {...register('lastName', { required: 'This is required.', pattern: /^[A-Za-z]+$/i, minLength: { value: 4, message: 'Min length is 4'}})} 
          placeholder='Last Name'
           />
        <p>{errors.lastName?.message}</p>
        <input 
          {...register('email', { required: 'This is required.', pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i})} 
          placeholder='Email' 
          />
        <p>{errors.email?.message}</p>
        <input type='submit' />
      </form>
       <h2>Render Count: {isValid && renderCount}</h2>
    </div>
    
  );
}

export default App;
