#!/bin/bash

# This script creates a React page/component with the given name and dynamic folder path

if [ -z "$1" ]; then
  echo "Page name is required."
  exit 1
fi

if [ -z "$2" ]; then
  echo "Folder path is required."
  exit 1
fi

PAGE_NAME=$1
FOLDER_PATH=$2

# Create the folder path dynamically
mkdir -p src/pages/$FOLDER_PATH

# Create the page file in the dynamic folder path
touch src/pages/$FOLDER_PATH/$PAGE_NAME.tsx

# Create a basic functional component in the new file
echo "import React from 'react';" > src/pages/$FOLDER_PATH/$PAGE_NAME.tsx
echo "" >> src/pages/$FOLDER_PATH/$PAGE_NAME.tsx
echo "const $PAGE_NAME = () => {" >> src/pages/$FOLDER_PATH/$PAGE_NAME.tsx
echo "  return (" >> src/pages/$FOLDER_PATH/$PAGE_NAME.tsx
echo "    <div>" >> src/pages/$FOLDER_PATH/$PAGE_NAME.tsx
echo "      <h1>Welcome to the $PAGE_NAME Page!</h1>" >> src/pages/$FOLDER_PATH/$PAGE_NAME.tsx
echo "    </div>" >> src/pages/$FOLDER_PATH/$PAGE_NAME.tsx
echo "  );" >> src/pages/$FOLDER_PATH/$PAGE_NAME.tsx
echo "};" >> src/pages/$FOLDER_PATH/$PAGE_NAME.tsx
echo "" >> src/pages/$FOLDER_PATH/$PAGE_NAME.tsx
echo "export default $PAGE_NAME;" >> src/pages/$FOLDER_PATH/$PAGE_NAME.tsx

# Print success message
echo "$PAGE_NAME page created successfully in src/pages/$FOLDER_PATH/"
