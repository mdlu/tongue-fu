import pyphen
import re
import math
from collections import Counter
import numpy as np
import textdistance

# Look into https://github.com/bootphon/phonemizer

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
    
    exempt_list = ['a','an','the','of','by','to','at','on','be',"i",'and']
    
    initials = {i: 0 for i in "abcdefghijlmnopqrstuvwyz"}
    for s in syllables:
        initials[s[0]] += 1

    start = [s[0] for s in syllables]
    let = Counter(start)
    bonus = 0
    n = 0
    syl_significant = []
    for i in range(len(syllables)):
        try:
            if not (syllables[i] in exempt_list and syllables[i+1] not in exempt_list):
                syl_significant.append(syllables[i])
        except:
            pass

    syl_significant.append('?') # to make sure the last factorial is computed
    for i in range(len(syl_significant)-1):
        word1 = syl_significant[i]
        word2 = syl_significant[i+1]
        if word2[0] == word1[0]:
            n += 1
        else:
            if n > 4:
                bonus += 2**((n+4)/2)
            else:
                bonus += 2**n
            n = 0
    #print(bonus)
    return int(bonus + np.mean([let[l]**2 for l in let])/np.log(len(syl_significant)+10)*np.log(10))

def compare(orig, sample):
    raw_sim = textdistance.editex.normalized_similarity(orig,sample)
    return raw_sim
