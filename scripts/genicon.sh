#!/bin/bash

# NOTE: https://raw.githubusercontent.com/hovdallakyan/react-generate-component-script/master/rc-new.sh
echo $(pwd)
cd src/components/

# Creating A SCSS File With The Component's Name
# Change The .scss To .css Or .less If You Use One Of Those
touch $1.module.css;

# If The Second Argument Is 'C', Create A New Class Based Component
if [ "$2" = "c" ];
then
  echo "import React, { Component } from 'react';
import './$1.scss'

class $1 extends Component {
  render() {
    return (
      <div>
      $1 component
      </div>
    );
  }
}

export default $1;" >> ${1}.tsx;

  echo ".$1 {}" >> ${1}.module.css;



# Creating A New Functional Component
else 
  echo "import React, { useState } from 'react';
import './$1.module.css'
  
const $1 = () => {
  const [store$1, setstore$1] = useState({});

  return (
    <div>
      $1
    </div>
  )
}

export default $1;" >> ${1}.tsx;

  echo ".$1 {}" >> ${1}.module.css;
fi

cd ../../
