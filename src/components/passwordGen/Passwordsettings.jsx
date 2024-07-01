import React, {useState, useEffect} from 'react';
import './Passwordsettings.css'
import StrenghtDisplay from './strenghtDisplay';

function PasswordSettings({setGeneratedPassword}) 
{
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [sliderValue, setSliderValue] = useState(8);
  const [Passwordstrenght, setPasswordstrenght] = useState('Very Weak');
  const [indicatorColors, setIndicatorColors] = useState(['red', 'border', 'border', 'border']);
  const [showWarning, setshowWarning] = useState(false);

  useEffect(() => {
    generatePassword();
  }, [uppercase, lowercase, numbers, symbols, sliderValue]);

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    switch (id) {
      case 'uppercase':
        setUppercase(checked);
        break;
      case 'lowercase':
        setLowercase(checked);
        break;
      case 'numbers':
        setNumbers(checked);
        break;
      case 'symbols':
        setSymbols(checked);
        break;
    }
  };

  const generatePassword = () => 
  {
    if (!uppercase && !lowercase && !numbers && !symbols) {    
        setshowWarning(true);
        return;
      }
    
    setshowWarning(false);
    let charset = '';
    if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) charset += '0123456789';
    if (symbols) charset += '!@#$%^&*()_+[]{}|;:,.<>?';

    let arr = charset.split('');
    let n = arr.length;
    
    for(var i=0 ; i<n-1 ; ++i) {
      var j = Math.floor(Math.random() * n);
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    charset = arr.join('');

    let password = '';
    while (true) {
      password = Array.from({ length: sliderValue }, () =>
        charset.charAt(Math.floor(Math.random() * charset.length))
      ).join('');

      const regexPattern = [
        uppercase && '(?=.*[A-Z])',
        lowercase && '(?=.*[a-z])',
        numbers && '(?=.*\\d)',
        symbols && '(?=.*[!@#$%^&*()_+\\[\\]{}|;:,.<>?])',
      ].filter(Boolean).join('');

      const regex = new RegExp(`^${regexPattern}.*$`);
      if (regex.test(password)) {
        break;
      }
    }

    setGeneratedPassword(password);
    calcStrenght(password);
  };

  const calcStrenght = (password) =>
  {
    let score = 0;
    if (uppercase) score += 2;
    if (lowercase) score += 1;
    if (numbers) score += 2;
    if (symbols) score += 3;

    score += password.length * 1.5;

    if (score < 10)
      {setPasswordstrenght('Very Weak');
        setIndicatorColors(['red', 'border', 'border', 'border']);}
    else if (score < 20)
      {setPasswordstrenght('Weak');
        setIndicatorColors(['orange', 'orange', 'border', 'border']);}
    else if (score < 30)
      {setPasswordstrenght('Medium');
        setIndicatorColors(['yellow', 'yellow', 'yellow', 'border']);}
    else
    {setPasswordstrenght('Strong');
      setIndicatorColors(['#a4ffaf', '#a4ffaf', '#a4ffaf', '#a4ffaf']);}
  };


  return (
    <div className='passwordsettings'>
      <div className='SliderContent'>
        <div className='charTitle'>
          <p>Password Lenght</p>
          <p id="slidervalue">{sliderValue}</p>
        </div>

        <div className='slidecontainer'>
          <input type="range" min="4" max="30" className='slider' id="myRange" value={sliderValue} onChange={(event) => setSliderValue(event.target.value)}/>
        </div>
      </div>
      <br/>

      <div className='checkboxes'>
        <input type="checkbox" id="uppercase" name="uppercase" value="Uppercase" checked={uppercase} onChange={handleCheckboxChange}/>
        <label forHtml="uppercase">Include Uppercase Letters</label><br/>
        <input type="checkbox" id="lowercase" name="lowercase" value="Lowercase" checked={lowercase} onChange={handleCheckboxChange}/>
        <label forHtml="lowercase">Include Lowercase Letters</label><br/>
        <input type="checkbox" id="numbers" name="numbers" value="Numbers" checked={numbers} onChange={handleCheckboxChange}/>
        <label forHtml="numbers">Include Numbers</label><br/>
        <input type="checkbox" id="symbols" name="symbols" value="Symbols" checked={symbols} onChange={handleCheckboxChange}/>
        <label forHtml="symbols">Include Symbols</label><br/>
      </div>
      <br/>

      {showWarning && (
      <>
        <div className='warningMsg'>Select Atleast 1 Option.</div>
        <br/>
      </>
      )}

      <StrenghtDisplay passwordStrength={Passwordstrenght} indicatorColors={indicatorColors}/>
      <br/>

      <button onClick={generatePassword}>Generate</button>

    </div>
  );
}

export default PasswordSettings;