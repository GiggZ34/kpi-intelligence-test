import numpy as np


def array_median_index(count) -> int:
    if count == 0:
        return -1
    return int(np.floor(np.divide(count, 2)))