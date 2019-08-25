from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from twitmaker.models import Tweet
from twitmaker.forms import TweetForm

def index(request):
    return render(request, 'index.html', {
        'tweets': Tweet.objects.all(), 
        'form': TweetForm()
    })


def create_tweet(request):  # When user clicks 'Tweet'.
    form = TweetForm(request.POST)
    tweet = form.instance
    if form.is_valid():
        form.save()
        # return HttpResponseRedirect('/')
        return JsonResponse({  # Instead of a redirect, return the data from the form as JSON.
            'created_at': tweet.created_at,
            'message': tweet.message,
        })
    else:
        return render(request, 'index.html', {
            'tweets': Tweet.objects.all(), 
            'form': form
        })
