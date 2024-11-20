#!/bin/bash
for file in $(find src -name '*.css'); do
  mv "$file" "${file%.css}.scss"
done

