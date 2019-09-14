import pyphen
import re
import math

def score(text):
    dic = pyphen.Pyphen(lang='en')
    syllables = []
    for word in text.lower().split(' '):
        syllables.extend(dic.inserted(re.sub(r'\W+', '', word)).split('-'))

    homophones1 = {'k': 'c', 'x': 'z'}
    homophones2 = {'ph': 'f', 'ge': 'j', 'gi': 'j', 'ce': 's', 'gn': 'n', 'wr': 'r', 'ps': 's'}

    for s in syllables:
        if s[:2] in homophones2:
            s = homophones2[s[:2]] + s[2:]
        if s[:1] in homophones1:
            s = homophones1[s[:1]] + s[1:]

    initials = {i: 0 for i in "abcdefghijlmnopqrstuvwyz"}
    for s in syllables:
        initials[s[0]] += 1

    bonus = 0
    n = 0
    syllables.append('?') # to make sure the last factorial is computed
    for i in range(len(syllables)-1):
        word1 = syllables[i]
        word2 = syllables[i+1]
        if word2[0] == word1[0]:
            n += 1
        else:
            bonus += 2**n
            n = 0

    return bonus + sum([2*initials[i] for i in initials])

print(score(input("your tongue twister: ")))