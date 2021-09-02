/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import React from 'react'
import { Redirect } from '@docusaurus/router'
import styles from './styles.module.css'

function Home() {
    return <Redirect to={'docs/doc1/doc1'} />
}

export default Home
