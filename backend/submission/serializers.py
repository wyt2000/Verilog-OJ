from rest_framework import serializers
from .models import Submission, SubmissionResult

class SubmissionResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubmissionResult
        fields = '__all__'
        exclude = ['id', 'submission']

class SubmissionSerializer(serializers.ModelSerializer):
    results = SubmissionResultSerializer(source='get_results', read_only=True, many=True)
    total_grade = serializers.IntegerField(source='get_total_grade', read_only=True)
    judged = serializers.BooleanField(source='have_judged', read_only=True)
    class Meta:
        model = Submission
        fields = '__all__'