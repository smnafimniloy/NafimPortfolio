---
title: "Building BanglaLLM: Training a Language Model from Scratch"
date: 2026-04-18
cover:
tags: NLP, Machine Learning, Research, Python
excerpt: Why I trained a 100M parameter transformer specifically for Bangla, what broke along the way, and what I learned about tokenization, data quality, and the gap between "it runs" and "it works".
# draft: true
---

Most large language models treat Bangla as an afterthought, and you can tell. The output is stilted, romanised words slip in mid-sentence, and the models clearly haven't seen enough natural Bangla to write it fluently. That frustration is what started BanglaLLM.

## The tokenizer problem

The first thing I underestimated was tokenization. Most multilingual models use BPE tokenizers trained mostly on English, so a single Bangla word often breaks into 6 to 10 tokens. That wastes compute, and it hurts generation quality too: the model has to "think" in chunks that don't line up with meaningful parts of the language.

I trained my own tokenizer on a Bangla corpus, with a 16,000 token vocabulary. I could see the difference right away. Words that used to split into 8 tokens now came out as 1 or 2, and that alone made the generated text noticeably more coherent before I had changed anything else.

## Data is everything, and cleaning it is miserable

I scraped and compiled text from Bangla Wikipedia, the Prothom Alo archives and several public datasets, roughly 4.2GB of raw text. Deduplicating it, stripping boilerplate and filtering out mixed-script noise brought that down to about 2.8GB. It was cleaner, but smaller than I wanted.

> The single most time-consuming part of this project wasn't the model training. It was sitting in a Jupyter notebook at 2am removing HTML artifacts and deciding whether a given sentence was "clean enough" to keep.

## Architecture and training

The model is a standard decoder-only transformer with 12 layers, 768 hidden dimensions and 12 attention heads, about 100 million parameters in total. I kept the architecture conventional on purpose, so that the things I was really testing were the data and the tokenizer, not the model design.

Training ran on a single A100 (Colab Pro+) over several sessions, about 80 GPU-hours in total. The loss converged well, but around epoch 6 it hit a plateau that took me two weeks to diagnose. It turned out to be a bug in the learning rate schedule that was silently dropping the LR to zero too early.

## What I'd do differently

- Start with a larger, cleaner corpus. 2.8GB is not enough for a 100M model.
- Instrument training carefully from day one. The LR bug cost me weeks.
- Add evaluation benchmarks earlier. I relied on gut feeling for too long.

The demo is live at [demobanglallm.streamlit.app](https://demobanglallm.streamlit.app/) if you want to try it. It's imperfect, but it does generate coherent Bangla, and to me that was worth shipping.
