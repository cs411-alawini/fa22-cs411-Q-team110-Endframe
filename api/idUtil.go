package main

import (
	"math/rand"
	"time"
)

func RandomNumberGenerator() *rand.Rand {
	s1 := rand.NewSource(time.Now().UnixNano())
	r1 := rand.New(s1)
	return r1
}

var idGenerator *rand.Rand = RandomNumberGenerator()

var MAX_ID_INT int = 2147483647
