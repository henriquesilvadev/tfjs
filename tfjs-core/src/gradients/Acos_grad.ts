/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import {Acos} from '../kernel_names';
import {GradConfig} from '../kernel_registry';
import {cast} from '../ops/array_ops';
import {div} from '../ops/div';
import {neg} from '../ops/neg';
import {square} from '../ops/square';
import {sub} from '../ops/sub';
import {scalar} from '../ops/tensor_ops';
import {sqrt} from '../ops/unary_ops';
import {Tensor} from '../tensor';

export const acosGradConfig: GradConfig = {
  kernelName: Acos,
  inputsToSave: ['x'],
  gradFunc: (dy: Tensor, saved: Tensor[]) => {
    const [x] = saved;

    return {
      x: () => {
        const a = square(cast(x, 'float32'));
        const b = sqrt(sub(scalar(1), a));
        return neg(div(dy, b));
      }

    };
  }
};
