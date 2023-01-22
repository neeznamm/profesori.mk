truncate table post_vote;
alter sequence post_vote_sequence restart;
truncate table post_report;
alter sequence post_report_sequence restart;
truncate table post cascade;
alter sequence post_id_seq restart;
