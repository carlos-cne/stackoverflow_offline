#!/bin/bash

BUNDLE_ID=com.anonymous.meetup-frontend-bh
cd $(xcrun simctl get_app_container booted $BUNDLE_ID)
cd ../../../../Data
find . -name 'frontend_bh.db' -exec open {} \;